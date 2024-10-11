export class NotSupportedError extends Error {}
export class GenericError extends Error {}
export class PermissionNotGranted extends Error {}

class ExceptionHandlerService {
  handle(error, message) {
    console.error("ExceptionHandlerService", error);

    if (error instanceof NotSupportedError) {
      this.postErrorMessage(message, 2000, "Not supported", error.message);
    }

    if (error instanceof GenericError) {
      this.postErrorMessage(message, 1000, "Generic error", error.message);
    }

    if (error instanceof PermissionNotGranted) {
      this.postErrorMessage(
        message,
        3000,
        "Permission not granted",
        error.message
      );
    }
  }

  postErrorMessage(message, code, title, text) {
    window.opener.postMessage(
      {
        origin: message.data.origin,
        jsonrpc: message.data.jsonrpc,
        id: message.data.id,
        error: {
          code,
          message: title,
          text,
        },
      },
      message.origin
    );
  }
}

export const exceptionHandlerService = new ExceptionHandlerService();
