import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // check if the user already exists in the db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    // hash their password
    const hash = await bcrypt.hash(password, 10);
    // create user
    const newUser = await new User({ name, email, password: hash }).save();
    console.log(newUser);
    // create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    // send back the token
    res.status(201).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error signup user. Please try again later');
  }
};
