"use client";
import { useState } from "react";
import QuizCard from './QuizCard';
import Quiz from './page';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Quiz />
    </div>
  );
}