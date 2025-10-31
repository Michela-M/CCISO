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
            // TODO: Handle no quizzes found
            return;
        }
    } catch (error) {
        // TODO: Handle error appropriately
    }
};
