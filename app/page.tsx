'use client';

import { useState, useEffect } from 'react';

export default function PasswordScreen() {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [locked, setLocked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [cardOpened, setCardOpened] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const correctPassword = '1213';

  const handleNumberClick = (num: string) => {
    if (password.length < 4) {
      const newPassword = password + num;
      setPassword(newPassword);
      setShowError(false);

      // Auto-submit when 4 digits are entered
      if (newPassword.length === 4) {
        setTimeout(() => {
          checkPassword(newPassword);
        }, 100);
      }
    }
  };

  const checkPassword = (pwd: string) => {
    if (pwd === correctPassword) {
      setLocked(true);
      setTimeout(() => {
        setPassword('');
        setShowError(false);
        setLocked(false);
        setUnlocked(true);
      }, 500);
    } else {
      setShowError(true);
      setPassword('');
    }
  };

  const openCard = () => {
    setCardOpened(true);
    setDisplayedText('');
  };

  const fullMessage = "Hiiiiiii! I just want to say thank you so much for everything and for the time you spent with me, kahit medyo natatakot na ako HAHAHHAHAHA kadeee joke lang but yeah, really thank you";

  useEffect(() => {
    if (cardOpened && displayedText.length < fullMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullMessage.slice(0, displayedText.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [cardOpened, displayedText]);

  // Envelope screen
  if (unlocked && !cardOpened) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-white to-pink-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-8">
          {/* Closed Envelope */}
          <div
            onClick={openCard}
            className="cursor-pointer transform hover:scale-110 active:scale-95 transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.5))',
            }}
          >
            <style>{`
              @keyframes pulse-glow {
                0%, 100% { filter: drop-shadow(0 0 30px rgba(236, 72, 153, 0.5)); }
                50% { filter: drop-shadow(0 0 50px rgba(236, 72, 153, 0.8)); }
              }
              .envelope-glow {
                animation: pulse-glow 2s ease-in-out infinite;
              }
            `}</style>
            <div className="envelope-glow relative w-80 h-52 bg-gradient-to-b from-pink-100 to-pink-50 rounded-xl shadow-2xl overflow-hidden border-2 border-pink-200">
              {/* Left Flap */}
              <div
                className="absolute top-0 left-0 w-0 h-0"
                style={{
                  borderLeft: '160px solid transparent',
                  borderRight: '0px solid transparent',
                  borderTop: '130px solid #ec4899',
                }}
              />

              {/* Right Flap */}
              <div
                className="absolute top-0 right-0 w-0 h-0"
                style={{
                  borderLeft: '0px solid transparent',
                  borderRight: '160px solid transparent',
                  borderTop: '130px solid #db2777',
                }}
              />

              {/* Center crease line */}
              <div className="absolute top-0 left-1/2 w-0.5 h-32 bg-gradient-to-b from-pink-400 to-transparent opacity-40 -translate-x-1/2" />

              {/* Decorative line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Card opened screen
  if (unlocked && cardOpened) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-white to-pink-50 flex items-center justify-center p-4">
        {/* Audio player - autoplay */}
        <audio autoPlay loop style={{ display: 'none' }}>
          <source src="/music/music.mp3" type="audio/mpeg" />
        </audio>
        <div className="w-full max-w-sm">
          {/* Animated Card */}
          <div
            className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-2xl shadow-2xl p-12 border-2 border-pink-200 transform transition-all duration-1000"
            style={{
              animation: 'popUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <style>{`
              @keyframes popUp {
                from {
                  opacity: 0;
                  transform: scale(0.3) translateY(50px);
                }
                to {
                  opacity: 1;
                  transform: scale(1) translateY(0);
                }
              }
            `}</style>

            <div className="text-center space-y-6">
           
              {/* Message with typing animation */}
              <div className="space-y-4 min-h-24">
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  {displayedText}
                  <span className={displayedText.length < fullMessage.length ? 'animate-pulse' : ''}>
                    {displayedText.length < fullMessage.length ? '▌' : ''}
                  </span>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Password screen
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center gap-12 p-4 relative overflow-hidden">
      {/* Password Display Dots */}
      <div className={`flex gap-6 transition-all duration-100 relative z-10`}>
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full transition-all duration-200 shadow-lg ${
              password.length > index
                ? 'bg-pink-500 scale-100 shadow-pink-400/50'
                : 'bg-gray-300 scale-75'
            }`}
          />
        ))}
      </div>

      {/* Error Message */}
      <div className="text-center relative z-10 h-12">
        {showError && (
          <div>
            <p className="text-red-500 font-semibold text-lg mb-1">
              ❌ MALI MO PRE ❌
            </p>
            <p className="text-red-400 text-sm">
              Hint: birthday of Alas 🐕
            </p>
          </div>
        )}
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-6 relative z-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            disabled={locked}
            className="w-20 h-20 rounded-full bg-white hover:bg-gray-50 active:bg-pink-100 text-pink-600 text-3xl font-bold transition-all transform hover:scale-110 active:scale-95 disabled:opacity-50 shadow-lg hover:shadow-xl"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Bottom Row: Just 0 */}
      <div className="flex gap-6 relative z-10 justify-center">
        {/* 0 Button */}
        <button
          onClick={() => handleNumberClick('0')}
          disabled={locked}
          className="w-20 h-20 rounded-full bg-white hover:bg-gray-50 active:bg-pink-100 text-pink-600 text-3xl font-bold transition-all transform hover:scale-110 active:scale-95 disabled:opacity-50 shadow-lg hover:shadow-xl"
        >
          0
        </button>
      </div>
    </div>
  );
}
