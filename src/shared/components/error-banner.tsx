import logo from "../../assets/rick-and-morty.svg";

interface ErrorBannerProps {
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

export const ErrorBanner = ({
  title,
  description,
  link,
  linkLabel = "Take me there!",
}: ErrorBannerProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-xl min-h-[400px]">
      <img src={logo} alt="Rick and Morty Logo" className="w-64 h-auto mb-8" />
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
        {title}
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-md">{description}</p>
      {link && (
        <a
          href={link}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {linkLabel}
        </a>
      )}
    </div>
  );
};
