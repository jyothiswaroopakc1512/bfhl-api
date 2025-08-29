const express = require("express");
const app = express();
app.use(express.json());

const FULL_NAME = "Jyothi Swaroopa Karanam C";        
const DOB_DDMMYYYY = "12062005";                
const EMAIL = "karanamjyothiswaroopa@gmail";                
const ROLL = "22BCE1677";                     

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body || {};
    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input: 'data' must be an array of strings." });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    for (const item of data) {
      const s = String(item);

      if (/^\d+$/.test(s)) {
        const num = parseInt(s, 10);
        sum += num;
        (num % 2 === 0 ? even_numbers : odd_numbers).push(s); // keep as strings
      } else if (/^[A-Za-z]+$/.test(s)) {
        alphabets.push(s.toUpperCase()); // store uppercase words
      } else {
        special_characters.push(s);
      }
    }

    // Build reverse + alternating caps from all letters
    const lettersJoined = alphabets.join("");           // join all words (already UPPER)
    const reversed = lettersJoined.split("").reverse(); // reverse characters
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
      sum: String(sum),
      concat_string,
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, message: "Server error" });
  }
});

// (optional) tiny health check
app.get("/", (_req, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
