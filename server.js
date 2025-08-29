const express = require("express");
const app = express();
app.use(express.json());

// Your details
const FULL_NAME = "Jyothi Swaroopa Karanam C";
const DOB_DDMMYYYY = "12062005";
const EMAIL = "karanamjyothiswaroopa@gmail.com"; // ✅ added .com
const ROLL = "22BCE1677";

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body || {};
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' must be an array of strings.",
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    for (const item of data) {
      const s = String(item);

      if (/^\d+$/.test(s)) {
        // Number
        const num = parseInt(s, 10);
        sum += num;
        (num % 2 === 0 ? even_numbers : odd_numbers).push(s); // store as strings
      } else if (/^[A-Za-z]+$/.test(s)) {
        // Alphabets
        alphabets.push(s.toUpperCase()); // keep uppercase
      } else {
        // Special characters
        special_characters.push(s);
      }
    }

    // Build concat_string (reverse + alternating caps)
    const lettersJoined = alphabets.join(""); // join all words
    const reversed = lettersJoined.split("").reverse();
    const concat_string = reversed
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME.replace(/\s+/g, "_").toLowerCase()}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum), // ✅ sum must be string
      concat_string,
    });
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      message: "Server error",
    });
  }
});

// Health check
app.get("/", (_req, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
