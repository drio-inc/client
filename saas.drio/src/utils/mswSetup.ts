import { rest } from "msw";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { DDXData } from "@/mocks/DDXData";
import { accountData } from "@mocks/accountData";
import { orgUnitData } from "@mocks/orgUnitData";
import { fetch, Headers, Request, Response } from "cross-fetch";

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export const handlers = [
  rest.get(`${process.env.API_URL}/resources/accounts`, (_req, res, ctx) => {
    return res(ctx.json(accountData));
  }),

  rest.get(
    `${process.env.API_URL}/resources/accounts/*/ous`,
    (_req, res, ctx) => {
      return res(ctx.json(orgUnitData));
    }
  ),

  rest.get(
    `${process.env.API_URL}/resources/accounts/*/ous/*/ddx-clusters`,
    (_req, res, ctx) => {
      return res(ctx.json(DDXData));
    }
  ),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
