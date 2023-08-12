import { rest } from "msw";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { accountData } from "@mocks/accountData";
import { fetch, Headers, Request, Response } from "cross-fetch";

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export const handlers = [
  rest.get("/api/resources/accounts", (_req, res, ctx) => {
    return res(ctx.json(accountData));
  }),
];

export const server = setupServer(...handlers);

// Enable the API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable the API mocking after the tests finished.
afterAll(() => server.close());
