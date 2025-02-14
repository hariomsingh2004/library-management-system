const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

//  Define Schemas
const bookSchema = new mongoose.Schema({
    bookName: String,
    authorName: String,
    category: String,
    quantity: Number,
    serialNo: String,
    status: String
});

const issueSchema = new mongoose.Schema({
    bookName: String,
    authorName: String,
    issueDate: Date,
    returnDate: Date,
    remarks: String
});

const returnSchema = new mongoose.Schema({
    bookName: String,
    authorName: String,
    serialNo: String,
    issueDate: Date,
    returnDate: Date,
    remarks: String
});

const membershipSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    contactNumber: String,
    address: String,
    startDate: Date,
    endDate: Date,
    membershipType: String
});

const transactionCancelSchema = new mongoose.Schema({
    transactionId: String,
    reason: String,
    canceledAt: { type: Date, default: Date.now }
});

const fineSchema = new mongoose.Schema({
    bookName: String,
    authorName: String,
    serialNo: String,
    issueDate: Date,
    returnDate: Date,
    fineCalculated: Number,
    finePaid: Boolean,
    remarks: String
});

//  Create Models
const Book = mongoose.model("Book", bookSchema);
const Issue = mongoose.model("Issue", issueSchema);
const ReturnBook = mongoose.model("ReturnBook", returnSchema);
const Membership = mongoose.model("Membership", membershipSchema);
const TransactionCancel = mongoose.model("TransactionCancel", transactionCancelSchema);
const Fine = mongoose.model("Fine", fineSchema);

//  Routes

//  Add a New Book
app.post("/add-book", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json({ message: " Book added successfully!" });
    } catch (error) {
        res.status(500).json({ error: " Error adding book" });
    }
});

//  Check if Book is Available
app.post("/check-book", async (req, res) => {
    try {
        const { bookName, authorName } = req.body;
        const book = await Book.findOne({ bookName, authorName });
        res.json(book ? { available: true, quantity: book.quantity } : { available: false });
    } catch (error) {
        res.status(500).json({ error: " Error searching for book" });
    }
});

//  Issue a Book
app.post("/issue-book", async (req, res) => {
    try {
        const newIssue = new Issue(req.body);
        await newIssue.save();
        res.status(201).json({ message: " Book issued successfully!" });
    } catch (error) {
        res.status(500).json({ error: " Error issuing book" });
    }
});

//  Return a Book
app.post("/return-book", async (req, res) => {
    try {
        const newReturn = new ReturnBook(req.body);
        await newReturn.save();
        res.status(201).json({ message: "Book returned successfully!" });
    } catch (error) {
        res.status(500).json({ error: " Error returning book" });
    }
});

// Update Book Status
app.put("/update-book", async (req, res) => {
    try {
        const { bookName, authorName, serialNo, status } = req.body;
        const updatedBook = await Book.findOneAndUpdate(
            { bookName, authorName, serialNo }, 
            { status }, 
            { new: true } 
        );

        if (!updatedBook) {
            return res.status(404).json({ error: " Book not found" });
        }

        res.json({ message: "Book updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: " Error updating book" });
    }
});

// Add Membership
app.post("/add-membership", async (req, res) => {
    try {
        const newMembership = new Membership(req.body);
        await newMembership.save();
        res.status(201).json({ message: " Membership added successfully!" });
    } catch (error) {
        res.status(500).json({ error: " Error adding membership" });
    }
});

// Update Membership
app.put("/update-membership", async (req, res) => {
    try {
        const { membershipId, startDate, endDate, membershipType } = req.body;
        const updatedMembership = await Membership.findByIdAndUpdate(
            membershipId, 
            { startDate, endDate, membershipType }, 
            { new: true }
        );

        if (!updatedMembership) {
            return res.status(404).json({ error: "Membership not found" });
        }

        res.json({ message: " Membership updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: " Error updating membership" });
    }
});

//  Delete Membership
app.delete("/delete-membership", async (req, res) => {
    try {
        const { membershipId } = req.body;
        const deletedMembership = await Membership.findByIdAndDelete(membershipId);

        if (!deletedMembership) {
            return res.status(404).json({ error: " Membership not found" });
        }

        res.json({ message: "🗑️ Membership removed successfully!" });
    } catch (error) {
        res.status(500).json({ error: " Error deleting membership" });
    }
});

//  Cancel Transaction
app.post("/cancel-transaction", async (req, res) => {
    try {
        const newCancel = new TransactionCancel(req.body);
        await newCancel.save();
        res.status(201).json({ message: " Transaction canceled successfully!" });
    } catch (error) {
        res.status(500).json({ error: " Error canceling transaction" });
    }
});

//  Pay Fine
app.post("/pay-fine", async (req, res) => {
    try {
        const fineData = new Fine(req.body);
        await fineData.save();
        res.status(201).json({ message: "Fine paid successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error processing fine payment" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
