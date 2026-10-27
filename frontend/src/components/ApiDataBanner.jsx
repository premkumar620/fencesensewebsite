import { useSite } from "../context/SiteContext";

export default function ApiDataBanner() {
  const { loading, error, isApiLive, refresh } = useSite();

  if (loading || isApiLive) return null;

  return (
    <div className="api-data-banner" role="status">
      <p>
        {error
          ? "Django API is offline — showing local copy. Run npm run api in another terminal, then "
          : "Using local data — start the API with npm run api, then "}
        <button type="button" className="api-data-banner-btn" onClick={() => refresh()}>
          reload content
        </button>
        .
      </p>
    </div>
  );
}
