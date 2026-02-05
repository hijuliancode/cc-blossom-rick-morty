import { useRef } from "react";
import screenshotImage from "@/assets/screenshot.png";

type WelcomeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const completeButtonRef = useRef(null);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
          isOpen ? "" : "hidden"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
          {/* Left Column: Image */}
          <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-6 border-r border-gray-100">
            <img
              src={screenshotImage}
              alt="App Screenshot"
              className="rounded-lg shadow-lg max-h-[60vh] object-contain"
            />
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ¡Bienvenido a Rick and Morty App! 👋
            </h2>

            <div className="space-y-4 text-gray-600 mb-8 flex-1 font-medium">
              <p>
                Este proyecto ha sido desarrollado como parte de una prueba
                técnica para{" "}
                <a
                  href="https://www.blossom.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                >
                  <strong>Blossom</strong>.
                </a>
              </p>

              <p>
                Hemos construido una aplicación moderna utilizando{" "}
                <strong>React 19</strong>, <strong>Apollo Client</strong> y{" "}
                <strong>Tailwind CSS v4</strong> para consumir la API de GraphQL
                de Rick and Morty.
              </p>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  🤖 Potenciado por IA
                </h3>
                <p className="text-sm text-purple-800">
                  Para potenciar el desarrollo, hemos utilizado agentes de IA y
                  "skills" especializados. Si te interesa la parte técnica,
                  puedes consultar el archivo <code>README.md</code> en el
                  repositorio.
                </p>
              </div>

              <div className="">
                <a
                  href="https://github.com/hijuliancode/cc-blossom-rick-morty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium hover:underline mt-auto"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ver Repositorio en GitHub
                </a>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                ref={completeButtonRef}
                onClick={onClose}
                className="px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
