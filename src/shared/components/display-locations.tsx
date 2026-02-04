import { useQuery } from "@apollo/client/react";
import { GET_LOCATIONS } from "../../graphql/queries/get-locations";
import { ErrorBanner } from "./error-banner";

export type Location = {
  id: string;
  name: string;
  type: string;
  dimension: string;
};

export const DisplayLocations = () => {
  const { loading, error, data } = useQuery<{ locations: Location[] }>(
    GET_LOCATIONS,
  );

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <div className="h-screen flex items-center justify-center px-6">
        <ErrorBanner
          title="Uh oh! Something went wrong"
          description={error.message}
        />
      </div>
    );
  if (!data) return null;

  return data.locations.map((location: Location) => (
    <div key={location.id}>
      <p>{location.name}</p>
      <p>{location.type}</p>
      <p>{location.dimension}</p>
    </div>
  ));
};
