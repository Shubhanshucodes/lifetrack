import { Rocket } from "lucide-react"; // You can also use Target, Footprints, etc.

const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-white">
    <Rocket className="w-6 h-6 text-blue-500" />
    <span>Life</span>
    <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded">On</span>
    <span>Track</span>
  </div>
);

export default Logo;
