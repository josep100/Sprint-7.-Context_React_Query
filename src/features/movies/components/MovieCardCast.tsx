

const MovieCardCast = ({ name, character, profile_path }: {name: string, character: string, profile_path: string | null}) => {
  return (
    <ul className="flex gap-6">
      <li>
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w300${profile_path}`
                : "/placeholder-avatar.png"
            }
            alt={`Foto de ${name}`}
            className="w-full h-64 object-cover"
            loading="lazy"
          />

          <div className="p-3">
            <h3 className="font-semibold text-sm">{name}</h3>
            <p className="text-xs text-gray-600">como {character}</p>
          </div>
        </article>
      </li>
    </ul>
  );
};

export default MovieCardCast;
