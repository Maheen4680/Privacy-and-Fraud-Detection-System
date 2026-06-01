export type Customer = {
  id: string;
  name: string;
  email: string;
  accountAgeDays: number;
  returnsCount: number;
  trustScore: number;
};

export const CUSTOMERS: Customer[] = [
  { id: "C-1001", name: "Ada Lovelace",      email: "ada@enigma.io",       accountAgeDays: 842, returnsCount: 2,  trustScore: 94 },
  { id: "C-1002", name: "Grace Hopper",      email: "grace@cobol.dev",     accountAgeDays: 1290, returnsCount: 1, trustScore: 91 },
  { id: "C-1003", name: "Linus Torvalds",    email: "linus@kernel.org",    accountAgeDays: 410, returnsCount: 4,  trustScore: 78 },
  { id: "C-1004", name: "Margaret Hamilton", email: "mh@apollo.space",     accountAgeDays: 980, returnsCount: 0,  trustScore: 88 },
  { id: "C-1005", name: "Anonymous User",    email: "user_8821@mail.ru",   accountAgeDays: 3,   returnsCount: 11, trustScore: 12 },
  { id: "C-1006", name: "John Doe",          email: "jdoe1939@temp.email", accountAgeDays: 7,   returnsCount: 9,  trustScore: 22 },
  { id: "C-1007", name: "Alan Turing",       email: "turing@bletchley.uk", accountAgeDays: 620, returnsCount: 1,  trustScore: 86 },
  { id: "C-1008", name: "Rapid Buyer",       email: "buy.fast@quickmail.cc", accountAgeDays: 11, returnsCount: 7, trustScore: 27 },
  { id: "C-1009", name: "Katherine Johnson", email: "kj@nasa.gov",         accountAgeDays: 1450, returnsCount: 0, trustScore: 96 },
  { id: "C-1010", name: "Hedy Lamarr",       email: "hedy@spread.fm",      accountAgeDays: 730, returnsCount: 3,  trustScore: 81 },
  { id: "C-1011", name: "Test Account",      email: "test@throwaway.cf",   accountAgeDays: 2,   returnsCount: 8,  trustScore: 18 },
  { id: "C-1012", name: "Dennis Ritchie",    email: "dmr@bell-labs.com",   accountAgeDays: 1102, returnsCount: 2, trustScore: 89 },
];