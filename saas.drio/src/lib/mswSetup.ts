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

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
