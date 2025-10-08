import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/sutras", "routes/sutras.tsx"),
  route("/sutra/:number", "routes/sutra.tsx"),
  route("/shabda-manjari", "routes/shabda-manjari.tsx"),
  route("/vocabulario", "routes/vocabulario.tsx"),
  route("/maheshvara-sutrani", "routes/maheshvara-sutrani.tsx"),
  route("/pratishakhyam", "routes/pratishakhyam.tsx"),
] satisfies RouteConfig;
