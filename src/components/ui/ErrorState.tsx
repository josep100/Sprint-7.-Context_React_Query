import { AlertCircle, ArrowLeft, Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

type ErrorStateProps = {
  title: string;
  description?: string;
};

const ErrorState = ({ title, description }: ErrorStateProps) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <section
        className="max-w-md w-full text-center flex flex-col items-center mt-31.75"
        role="alert"
        aria-labelledby="error-title"
        aria-describedby="error-description"
      >
        <figure className="relative mb-8" aria-hidden="true">
          <span className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></span>

          <span className="relative bg-primary/10 p-8 rounded-full border border-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-7xl">
              <AlertCircle className="w-20 h-20" aria-hidden="true" />
            </span>
          </span>

          <span className="absolute -bottom-2 -right-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
            <span className="material-symbols-outlined text-primary text-2xl">
              <Clapperboard className="w-6 h-6" />
            </span>
          </span>
        </figure>

        <h1
          id="error-title"
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Película <span className="text-primary">{title}</span>
        </h1>

        <p
          id="error-description"
          className="text-slate-500 text-lg mb-10 leading-relaxed"
        >
          {description}
        </p>

        <nav
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          aria-label="Opciones disponibles"
        >
          <Link
            to="/movies"
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Ir atrás
          </Link>
        </nav>
      </section>
    </div>
  );
};

export default ErrorState;
