import app from "./app";
import env from "./config/env";

const { PORT, NODE_ENV } = env;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
});
