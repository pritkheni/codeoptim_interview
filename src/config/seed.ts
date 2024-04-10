import dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./db";
connectDb();
import Role from "../model/Role";
import User from "../model/User";
import bcrypt from "bcrypt";
const users = [
  {
    username: "john_doe",
    password: "password123",
    email: "john.doe@example.com",
    role: 7134564,
  },
  {
    username: "emma_smith",
    password: "secret789",
    email: "emma.smith@example.com",
    role: 7134564,
  },
  {
    username: "michael_jackson",
    password: "mjkingofpop",
    email: "michael.jackson@example.com",
    role: 7134564,
  },
  {
    username: "sarah_parker",
    password: "sarah1234",
    email: "sarah.parker@example.com",
    role: 7134564,
  },
  {
    username: "david_williams",
    password: "williamspwd",
    email: "david.williams@example.com",
    role: 7134564,
  },
  {
    username: "jessica_brown",
    password: "brownie456",
    email: "jessica.brown@example.com",
    role: 7134564,
  },
  {
    username: "robert_adams",
    password: "adam123",
    email: "robert.adams@example.com",
    role: 7134564,
  },
  {
    username: "olivia_thomas",
    password: "thomasolivia",
    email: "olivia.thomas@example.com",
    role: 7134564,
  },
  {
    username: "ethan_wilson",
    password: "wilsonethan",
    email: "ethan.wilson@example.com",
    role: 7134564,
  },
  {
    username: "emma_jones",
    password: "jonesemma",
    email: "emma.jones@example.com",
    role: 7134564,
  },
  {
    username: "william_robinson",
    password: "robinsonwilliam",
    email: "william.robinson@example.com",
    role: 7134564,
  },
  {
    username: "sophia_martinez",
    password: "martinezsophia",
    email: "sophia.martinez@example.com",
    role: 7134564,
  },
  {
    username: "james_garcia",
    password: "garciajames",
    email: "james.garcia@example.com",
    role: 7134564,
  },
  {
    username: "ava_richardson",
    password: "richardsonava",
    email: "ava.richardson@example.com",
    role: 7134564,
  },
  {
    username: "alexander_taylor",
    password: "tayloralexander",
    email: "alexander.taylor@example.com",
    role: 7134564,
  },
  {
    username: "oliver_morris",
    password: "morrisoliver",
    email: "oliver.morris@example.com",
    role: 7134564,
  },
  {
    username: "isabella_nelson",
    password: "nelsonisabella",
    email: "isabella.nelson@example.com",
    role: 7134564,
  },
  {
    username: "mia_carter",
    password: "cartermia",
    email: "mia.carter@example.com",
    role: 7134564,
  },
  {
    username: "benjamin_hernandez",
    password: "hernandezbenjamin",
    email: "benjamin.hernandez@example.com",
    role: 7134564,
  },
  {
    username: "amelia_gonzalez",
    password: "gonzalezamelia",
    email: "amelia.gonzalez@example.com",
    role: 7134564,
  },
  {
    username: "evelyn_roberts",
    password: "robertsevelyn",
    email: "evelyn.roberts@example.com",
    role: 7134564,
  },
  {
    username: "henry_evans",
    password: "evanshenry",
    email: "henry.evans@example.com",
    role: 7134564,
  },
  {
    username: "harper_diaz",
    password: "diazharper",
    email: "harper.diaz@example.com",
    role: 7134564,
  },
  {
    username: "daniel_martinez",
    password: "martinezdaniel",
    email: "daniel.martinez@example.com",
    role: 7134564,
  },
  {
    username: "samantha_wood",
    password: "woodsamantha",
    email: "samantha.wood@example.com",
    role: 7134564,
  },
  {
    username: "william_johnson",
    password: "johnsonwilliam",
    email: "william.johnson@example.com",
    role: 7134564,
  },
  {
    username: "ava_garcia",
    password: "garciaava",
    email: "ava.garcia@example.com",
    role: 7134564,
  },
  {
    username: "madison_miller",
    password: "millermadison",
    email: "madison.miller@example.com",
    role: 7134564,
  },
  {
    username: "noah_clark",
    password: "clarknoah",
    email: "noah.clark@example.com",
    role: 7134564,
  },
  {
    username: "olivia_morris",
    password: "morrisolivia",
    email: "olivia.morris@example.com",
    role: 7134564,
  },
];
const roleData = [
  {
    roleName: "admin",
    roleCode: 4578964,
  },
  {
    roleName: "user",
    roleCode: 7134564,
  },
];

//@description this funcation is for seeding users and admin into db
const seedRoleAndUser = async () => {
  try {
    const role = await Role.find({});
    if (role.length === 0) {
      await Role.insertMany(roleData);
    }
    const adminRole = await Role.findOne({ roleName: "admin" });
    const adminUser = await User.findOne({ role: adminRole?.roleCode });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash("admin@5679", 10);
      await User.create({
        email: "admin@gmail.com",
        password: hashedPassword,
        role: adminRole?.roleCode,
        username: "Admin",
      });
    }
    const userRole = await Role.findOne({ roleName: "user" });
    const normalUsers = await User.find({ role: userRole?.roleCode });
    console.log(normalUsers);
    if (normalUsers.length === 0) {
      const hashedPasswords = await Promise.all(
        users.map(async (user) => await bcrypt.hash(user.password, 10))
      );
      const createUser = await Promise.all(
        users.map(async (user, index) => {
          await User.create({
            email: user.email,
            password: hashedPasswords[index],
            role: userRole?.roleCode,
            username: user.username,
          });
        })
      );
    }
  } catch (err) {
    console.log(`[seeding]: somethig went wrong while seeding`);
    console.log(`[seeding]: error`);
    console.log(`${err}`);
  }
};

seedRoleAndUser();
