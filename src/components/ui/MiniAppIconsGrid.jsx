import {
  QrCode,
  Link,
  UserPlus,
  Lock,
  BarChart,
  Clock,
  Globe,
  Database,
  Code,
  Shield,
  Wallet,
  MessageCircle,
} from "lucide-react";

import { motion } from "framer-motion";

const iconsData = [
  {
    icon: <QrCode size={16} />,
    label: "QR Gen",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    icon: <Link size={16} />,
    label: "Media",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    icon: <UserPlus size={16} />,
    label: "Signup",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    icon: <Lock size={16} />,
    label: "Auth Guard",
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    icon: <BarChart size={16} />,
    label: "Analytics",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    icon: <Clock size={16} />,
    label: "Timers",
    color: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    icon: <Globe size={16} />,
    label: "Language",
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    icon: <Database size={16} />,
    label: "DB Viewer",
    color: "bg-gray-50 text-gray-700 border-gray-200",
  },
  {
    icon: <Code size={16} />,
    label: "Formatter",
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    icon: <Shield size={16} />,
    label: "Privacy",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    icon: <Wallet size={16} />,
    label: "Crypto Pay",
    color: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    icon: <MessageCircle size={16} />,
    label: "Chat Mini",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
];

const bounceAnim = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  }),
};

const MiniAppIconsGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-white border border-gray-200 rounded-md">
      {iconsData.map((item, idx) => (
        <motion.div
          key={idx}
          className="flex flex-col items-center justify-center p-2 border rounded-md shadow-sm bg-white border-gray-200"
          initial="hidden"
          animate="visible"
          custom={idx}
          variants={bounceAnim}
        >
          <div className={`p-2 rounded-md border ${item.color}`}>
            {item.icon}
          </div>
          <p className="mt-2 text-[9px] text-gray-600 text-center">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default MiniAppIconsGrid;
