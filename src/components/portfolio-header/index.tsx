import { useState } from 'react';
import { AiOutlineSun, AiOutlineMoon } from 'react-icons/ai';
import { FaArrowDown, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { LOCAL_STORAGE_KEY_NAME } from '../../constants';
import './index.css';

const PortfolioHeader = ({
  theme,
  setTheme,
  lightTheme,
  darkTheme,
  resumeFileUrl,
}: {
  theme: string;
  setTheme: (theme: string) => void;
  lightTheme: string;
  darkTheme: string;
  resumeFileUrl?: string;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    setIsAnimating(true);

    setTimeout(() => {
      const newTheme = theme === lightTheme ? darkTheme : lightTheme;
      document.documentElement.setAttribute('data-theme', newTheme);
      typeof window !== 'undefined' &&
        localStorage.setItem(LOCAL_STORAGE_KEY_NAME, newTheme);
      setTheme(newTheme);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="flex flex-col bg-cover bg-center relative overflow-hidden bg-image sm:m-2 sm:my-4 min-h-[80vh] sm:min-h-screen">
      {/* Overlay to reduce intensity */}
      <div className="overlay"></div>

      <div className="flex justify-between items-center p-2 mb-8 sm:mb-0 z-10 relative">
        <div></div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost bg-transparent hover:bg-transparent text-lg rounded-full px-4 py-2 flex items-center justify-center"
            style={{ width: '60px', height: '60px' }}
          >
            {theme === lightTheme ? (
              <AiOutlineMoon
                className={`text-white w-8 h-8 ${isAnimating ? 'spin-animation' : ''}`}
              />
            ) : (
              <AiOutlineSun
                className={`text-white w-8 h-8 ${isAnimating ? 'spin-animation' : ''}`}
              />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow px-2 pt-4 pb-8 sm:pb-20">
        <div
          className={`card justify-center text-center items-center w-full max-w-md sm:max-w-xl m-2 p-4 sm:p-10 ${theme === lightTheme ? 'bg-white bg-opacity-90' : 'bg-black bg-opacity-80'}`}
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-4">
            Igor Lima Rocha Azevedo
          </h1>
          <p className="text-sm sm:text-lg leading-relaxed font-light max-w-md sm:max-w-xl mx-auto text-gray-800 dark:text-gray-200">
            Electrical Engineer from the{' '}
            <span className="font-semibold italic text-primary">University of Brasília</span>, former Research Scholar at{' '}
            <span className="font-semibold italic text-primary">The University of Tokyo</span>, and incoming MRes student in Artificial Intelligence and Machine Learning at{' '}
            <span className="font-semibold italic text-primary">Imperial College London</span>.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-6">
            <motion.a
              href={resumeFileUrl}
              target="_blank"
              className={`cursor-pointer bg-gradient-to-r py-2 px-4 sm:px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center space-x-2 ${theme === lightTheme
                ? 'text-white from-blue-600 via-blue-400 to-blue-600'
                : 'text-white from-blue-300 via-blue-700 to-blue-400'
                }`}
              download
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="w-4 h-4" />
              <span>Download Resume</span>
            </motion.a>
          </div>
        </div>
        {/* Centralized animated arrow below the card */}
        <motion.div
          className="flex justify-center w-full mt-6"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaArrowDown className={`w-8 h-8 ${theme === lightTheme ? 'text-blue-200' : 'text-white'}`} />
        </motion.div>
      </div>
      <div className="text-center pb-2 text-xs z-10">
        <p>
          Background image by{' '}
          <a
            className="underline"
            href="https://unsplash.com/@g_leighton"
            target="_blank"
          >
            Gustavo Leighton
          </a>
        </p>
      </div>
    </div>
  );
};

export default PortfolioHeader;
