"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import ChristmasCard from "../components/ChristmasCard";

const WORD_CARDS = [
  {
    id: 1,
    title: "HIỆN TẠI",
    preview: "/cards/christmas-front-1.jpg",
    small: "/cards/christmas-card-front-1.jpg",
    text: `Giữa mùa đông này,
chúng ta đang ở hai nơi khác nhau.
Không có cái nắm tay,
không có những buổi tối đi bên nhau.

Nhưng có một điều vẫn ở đây,
rõ ràng hơn bất cứ thứ gì khác —
là việc anh yêu em,
ngay trong khoảnh khắc này.`,
  },
  {
    id: 2,
    title: "KHOẢNG CÁCH",
    preview: "/cards/christmas-front-2.jpg",
    small: "/cards/christmas-card-front-2.jpg",
    text: `Khoảng cách không dễ chịu,
nó làm những điều nhỏ trở nên khó khăn,
và những điều đơn giản trở thành mong chờ.

Nhưng khoảng cách cũng không thể
làm tình cảm này nhỏ đi.
Nó chỉ khiến anh hiểu rằng:
em quan trọng đến mức nào.`,
  },
  {
    id: 3,
    title: "KÝ ỨC & NIỀM TIN",
    preview: "/cards/christmas-front-3.jpg",
    small: "/cards/christmas-card-front-3.jpg",
    text: `Anh giữ lại những cuộc trò chuyện dài,
những lần nhớ nhau trong im lặng,
những cảm giác rất nhỏ
nhưng rất thật.

Chúng không ồn ào,
nhưng đủ ấm
để anh tin rằng
chúng ta đang đi đúng hướng.`,
  },
  {
    id: 4,
    title: "TƯƠNG LAI",
    preview: "/cards/christmas-front-4.jpg",
    small: "/cards/christmas-card-front-4.jpg",
    text: `Rồi sẽ có một ngày,
khoảng cách chỉ còn là câu chuyện cũ.
Chúng ta sẽ không cần đếm ngày,
không cần chờ tin nhắn để thấy yên lòng.

Cho đến ngày đó,
anh vẫn ở đây,
chọn em,
và chọn tương lai của chúng ta.`,
  },
];

export function WordsPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const activeCard = WORD_CARDS.find((c) => c.id === openId);

  return (
    <PageTransition>
      <main className="words-root">
        {!openId && (
          <div className="words-grid">
            {WORD_CARDS.map((card) => (
              <ChristmasCard
                key={card.id}
                closed
                small={card.small}
                path={card.preview}
                onOpen={() => setOpenId(card.id)}
                text={card.text}
                title={card.title}
              />
            ))}
          </div>
        )}

        <AnimatePresence>
          {activeCard && (
            <ChristmasCard
              path={activeCard.preview}
              text={activeCard.text}
              small={activeCard.small}
              onClose={() => setOpenId(null)}
              title={activeCard.title}
            />
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  );
}
