import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // check to see if a user exists with the provided email
    const user = await User.findOne({ email }).select('+password');
    // if not user, return error
    if (!user) {
      return res.status(404).send('No user exists with that email');
    }
    // check to see if users password matches the one in database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // if so, generate token
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });
      // send the token to the client
      res.status(200).json(token);
    } else {
      res.status(401).send('Passwords do not match');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loggin in user');
  }
};
