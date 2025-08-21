import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold">Welcome to Bar Manager</h1>
      <p className="text-lg text-center">
        Manage your bar like a pro with our intuitive interface.
      </p>
      <Image
        src="/images/bar-manager-logo.png"
        alt="Bar Manager Logo"
        width={200}
        height={200}
      />
      <footer className="text-sm text-gray-500">
        © {new Date().getFullYear()} Bar Manager. All rights reserved.
      </footer>
    </div>
  );
}
