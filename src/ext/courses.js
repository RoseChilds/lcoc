import dad1 from '../assets/img/courses/dad1.png';
import n90s from '../assets/img/courses/90s.png';
import brain from '../assets/img/courses/brain.png';
import dark from '../assets/img/courses/dark.png';
import sha256 from 'crypto-js/sha256';

let courses = [
  {
    title: "Dad Jokes 101",
    description: "Learn how to be a dad by telling incredibly funny jokes.",
    image: dad1,
    tags: ["online", "beginner-friendly"],
    level: 101,
    extendedDesc: "The Dad Jokes set of courses prepare students to become cringe-worthy father figures. Disappoint your children with ease by learning how to tell the most unfunny jokes in the world.",
    timetable: {
      "mon": "09:00 - 16:45",
      "thu": "09:00 - 16:45",
      "fri": "09:00 - 16:45"
    },
    price: 50
  },
  {
    title: "Dad Jokes 102",
    description: "Level up your fatherhood with even better jokes.",
    image: dad1,
    tags: ["online", "intermediate"],
    level: 102,
    extendedDesc: "The Dad Jokes set of courses prepare students to become cringe-worthy father figures. Disappoint your children with ease by learning how to tell the most unfunny jokes in the world.",
    timetable: {
      "tue": "10:30 - 17:15",
      "wed": "10:30 - 17:15",
      "fri": "11:00 - 15:00",
      "sat": "12:00 - 18:00"
    },
    price: 75
  },
  {
    title: "Jokes from the 90s",
    description: "You old fuck.",
    image: n90s,
    tags: ["online", "beginner-friendly", "dark"],
    extendedDesc: "Enjoy a blast from the past with these jokes from the 90s. You'll be laughing along with the rest of the kids in no time.",
    timetable: {
      "mon": "00:00 - 23:59",
      "tue": "00:00 - 23:59",
      "wed": "00:00 - 23:59",
      "thu": "00:00 - 23:59",
      "fri": "00:00 - 23:59",
      "sat": "00:00 - 23:59",
      "sun": "00:00 - 23:59"
    },
    disclaimer: "This course may include human experimentation and time travel."
  },
  {
    title: "Advanced Comedy",
    description: "For those who want to take their comedy to the next level.",
    image: brain,
    tags: ["advanced"],
    extendedDesc: "This course is for those who want to take their comedy to the next level. You'll learn how to tell jokes that are so funny, you'll be able to make people laugh even when they're not in the mood.",
    timetable: {
      "tue": "10:30 - 17:15",
      "wed": "10:30 - 17:15",
      "thu": "10:30 - 17:15",
      "sun": "10:00 - 14:00"
    },
    price: 250
  },
  {
    title: "Dark Humour 101",
    description: "How to offend Karens.",
    image: dark,
    tags: ["dark", "intermediate"],
    level: 101,
    extendedDesc: "The Dark Humour set of courses allow students to learn the ins and outs of dark humour. With this incredible skill at your disposal, you'll be making anyone laugh in no time!",
    price: 100,
    timetable: {
      "mon": "09:00 - 16:45",
      "thu": "09:00 - 16:45",
    }
  },
  {
    title: "Dark Humour 102",
    description: "More advanced offensiveness.",
    image: dark,
    tags: ["dark", "advanced"],
    level: 102,
    extendedDesc: "The Dark Humour set of courses allow students to learn the ins and outs of dark humour. With this incredible skill at your disposal, you'll be making anyone laugh in no time!",
    price: 125,
    timetable: {
      "tue": "10:30 - 17:15",
      "wed": "10:30 - 17:15",
      "fri": "11:00 - 15:00",
    }
  }
].map((course, index) => {
  course.id = sha256(JSON.stringify(course)).toString().substring(0, 5);
  return course;
});

export default courses;
