// react-player.d.ts (create this in your src/ folder)
import "react-player";

declare module "react-player" {
  interface Config {
    file?: {
      attributes?: {
        muted?: boolean;
        autoPlay?: boolean;
      };
    };
  }
}
