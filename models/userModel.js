const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    site_admin: "false",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    site_admin: "false",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    site_admin: "false",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
  {
    id: 4,
    name: "Admin",
    site_admin: "true",
    email: "admin@gmail.com",
    password: "admin",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { database, userModel };
