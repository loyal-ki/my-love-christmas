"use client";

import React, { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  hint?: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Về độ đẹp trai, thì em thấy a đẹp ở mức nào?",
    options: ["Bình thường", "Quá đẹp", "Đỉnh nóc kịch trần", "Xấu"],
    answerIndex: 2,
  },
  {
    id: 2,
    question: "Khi em giận dỗi anh, a thường làm gì?",
    options: [
      "Giả vờ không biết gì rồi lát quay lại dỗ",
      "Im lặng một lúc để em nguôi giận",
      "Đi hỏi Google “cách dỗ người yêu”",
      "Dỗ dành ngay lập tức vì sợ em buồn",
    ],
    answerIndex: 3,
  },
  {
    id: 3,
    question: "Ngày mà tụi mình chính thức quen là ngày tháng năm nào?",
    options: ["12/10/2022", "15/04/2021", "24/06/2022", "03/05/2022"],
    answerIndex: 1,
    hint: "Ngày mà nắm tay cùng nhau cười khúc khích!!!",
  },
];

export default function FunQuizPage(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAngry, setShowAngry] = useState(false);
  const [answers, setAnswers] = useState<Array<{ correct: boolean }>>([]);
  const [finished, setFinished] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const qCount = QUESTIONS.length;

  useEffect(() => {
    if (
      finished &&
      answers.length === qCount &&
      answers.every((a) => a.correct)
    ) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 3000);
      return () => clearTimeout(t);
    }
  }, [finished, answers]);

  useEffect(() => {
    if (finished) return;
    setSelected(null);
    setShowAngry(false);
  }, [index, finished]);

  function handleChoose(i: number) {
    if (selected !== null) return; // prevent double choose
    setSelected(i);
    const correct = i === QUESTIONS[index].answerIndex;
    setAnswers((s) => [...s, { correct }]);

    if (!correct) {
      setShowAngry(true);
      setTimeout(() => setShowAngry(false), 800);
    }

    setTimeout(() => {
      if (index + 1 >= qCount) {
        setFinished(true);
      } else {
        setIndex((p) => p + 1);
      }
    }, 1200);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setShowAngry(false);
    setAnswers([]);
    setFinished(false);
    setCelebrate(false);
  }

  const score = answers.filter((a) => a.correct).length;

  return (
    <div className="quiz-root">
      <style>{`
        :root{ --bg:#e6eef8; --card:#eef6ff; --shadow-light: rgba(255,255,255,0.9); --shadow-dark: rgba(16,40,80,0.12); }
        .quiz-root{min-height:80vh;display:flex;align-items:center;justify-content:center;padding:28px;} 
        .card{width:780px;max-width:100%;padding:26px;border-radius:20px;background:var(--card);box-shadow: 18px 18px 36px var(--shadow-dark), -18px -18px 36px var(--shadow-light);}
        .title{margin:0;font-size:22px;font-weight:800;color:#07315f}
        .question{margin-top:14px;font-size:18px;font-weight:700;color:#0b365e}
        .options{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:12px}
        .option{display:flex;align-items:center;gap:10px;padding:14px;border-radius:14px;border:1px solid rgba(10,20,40,0.06);background:linear-gradient(180deg, #f8fbff, #eef6ff);cursor:pointer;box-shadow: 6px 6px 12px rgba(16,40,80,0.06), -6px -6px 12px rgba(255,255,255,0.9);font-weight:700;font-size:15px}
        .option.correct{box-shadow: inset 6px 6px 12px rgba(50,200,120,0.06), -6px -6px 12px rgba(255,255,255,0.85);border-color: #c8f1dd}
        .option.wrong{box-shadow: inset 6px 6px 12px rgba(255,100,100,0.04), -6px -6px 12px rgba(255,255,255,0.85);border-color:#ffdede}
        .small{font-size:13px;color:#6b7b8f}
        .controls{display:flex;justify-content:space-between;align-items:center;margin-top:18px}
        .ghost{background:transparent;border:1px solid rgba(10,20,40,0.06);padding:8px 12px;border-radius:10px;cursor:pointer}
        .primary{background:linear-gradient(90deg,#6ad,#3b8);color:white;padding:10px 16px;border-radius:12px;border:none;cursor:pointer;font-weight:800}
        .progress{height:12px;background:#e8f1ff;border-radius:999px;overflow:hidden}
        .progress > .bar{height:100%;background:linear-gradient(90deg,#7ee,#3ab);width:0%;transition:width .6s cubic-bezier(.2,.9,.25,1)}
        /* angry overlay */
        .overlay{position:fixed;left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;pointer-events:none}
        @keyframes floaty {0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
        .angry-wrap{animation: floaty 900ms ease-in-out infinite}
        /* confetti */
        .confetti-piece{position:absolute;width:10px;height:18px;opacity:0;animation:confetti 2200ms linear forwards}
        @keyframes confetti{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(600px) rotate(720deg)}}
      `}</style>

      <div className="card">
        <h2 className="title">🎄 Anh có vài điều muốn hỏi cục cưng</h2>

        {!finished ? (
          <>
            <div
              style={{
                marginTop: 14,
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <div className="progress">
                  <div
                    className="bar"
                    style={{ width: `${(answers.length / qCount) * 100}%` }}
                  />
                </div>
              </div>
              <div className="small">
                Câu {Math.min(index + 1, qCount)} / {qCount}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="question">{QUESTIONS[index].question}</div>

              <div className="options">
                {QUESTIONS[index].options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === QUESTIONS[index].answerIndex;

                  return (
                    <motion.button
                      key={i}
                      className={`option ${
                        isSelected ? (isCorrect ? "correct" : "wrong") : ""
                      }`}
                      onClick={() => handleChoose(i)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.05,
                        type: "spring",
                        stiffness: 180,
                        damping: 18,
                      }}
                    >
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 8,
                          background: "#fff",
                          color: "#07315f",
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="option-span">{opt}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div style={{ marginTop: 12, minHeight: 26 }}>
                <AnimatePresence mode="wait">
                  {selected !== null && (
                    <motion.div
                      key={
                        selected === QUESTIONS[index].answerIndex
                          ? "correct"
                          : "wrong"
                      }
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                    >
                      {selected === QUESTIONS[index].answerIndex ? (
                        <div style={{ color: "#0a0", fontWeight: 700 }}>
                          💚 Chính xác đấy cục cưng 💚
                        </div>
                      ) : (
                        <div style={{ color: "#d00", fontWeight: 700 }}>
                          ❌ Sai rồi — giỡn mặt hả 🐶
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="controls">
                <div className="small">
                  Điểm hiện tại: <strong>{score}</strong>
                </div>
                <div style={{ display: "flex", gap: 8}}>
                  <button className="ghost" onClick={restart}>
                    Muốn chơi lại
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: "center", marginTop: 12 }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#abca0fff" }}>
              Kết thúc — Em trả lời đúng {score} / {qCount}
            </div>
            <div style={{ marginTop: 10 }}>
              {score === qCount ? (
                <div style={{ color: "#0a0", fontWeight: 800 }}>
                  🎉 Tuyệt vời! Thế mới là người yêu của anh chứ!
                </div>
              ) : (
                <div style={{ color: "#f60", fontWeight: 700 }}>
                  ( ｡ •̀ ᴖ •́ ｡)💢 --- Ơ hay ! Giỡn mặt hả ní. Dễ dị cũng sai nữa  (•̀⤙•́ )
                </div>
              )}
            </div>
            <div style={{ marginTop: 18 }}>
              <button className="primary" onClick={restart}>
                Chơi lại
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Angry face overlay */}
      <AnimatePresence>
        {showAngry && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="angry-wrap"
              initial={{ scale: 0.6, rotate: -6 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.6, rotate: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 16 }}
            >
              <AngryFace />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {celebrate && (
        <div aria-hidden>
          {Array.from({ length: 22 }).map((_, i) => {
            const rand = () => Math.random();
            const left = rand() * 100;
            const delay = rand() * 0.6;
            const bg = ["#ff6b6b", "#ffd93d", "#6be5b6", "#74a8ff"][i % 4];
            return (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${left}%`,
                  top: -20 - rand() * 40,
                  background: bg,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function AngryFace() {
  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="14"
            floodColor="#000"
            floodOpacity="0.35"
          />
        </filter>
      </defs>
      <circle
        cx="110"
        cy="110"
        r="90"
        fill="#ffefef"
        stroke="#ff6b6b"
        strokeWidth="6"
        filter="url(#f1)"
      />
      <g transform="translate(0,0)">
        <rect
          x="45"
          y="70"
          width="30"
          height="18"
          rx="6"
          fill="#222"
          transform="skewX(-10)"
        />
        <rect
          x="145"
          y="70"
          width="30"
          height="18"
          rx="6"
          fill="#222"
          transform="skewX(10)"
        />
        <path
          d="M70 140 C90 125 130 125 150 140"
          stroke="#a00"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          transform="translate(0,6)"
        />
        <path
          d="M75 128 L95 116"
          stroke="#700"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M145 128 L125 116"
          stroke="#700"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
