// src/utils/fetchLatestQuiz.js
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";

export const fetchLatestQuiz = async () => {
    try {
        const q = query(
            collection(db, "quizzes"),
            orderBy("createdAt", "desc"),
            limit(1),
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log("No quizzes found!");
            return;
        }

        const quizDoc = snapshot.docs[0].data();
        const fetchedQuestions = quizDoc.questions;
        //setQuestions(fetchedQuestions); // store temporarily in state

        console.log("Fetched Questions:", fetchedQuestions);
    } catch (error) {
        console.error("Error fetching quiz:", error);
    }
};
