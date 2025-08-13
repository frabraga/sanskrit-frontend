import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/sutras", "routes/sutras.tsx"),
  route("/sutra/:number", "routes/sutra.tsx"),
] satisfies RouteConfig;
