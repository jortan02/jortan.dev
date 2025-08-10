import { POST } from './route';

// Mock external SDKs used by the route
vi.mock('@huggingface/inference', () => ({
  InferenceClient: vi.fn().mockImplementation(() => ({
    featureExtraction: vi.fn().mockResolvedValue([0.1, 0.2, 0.3]),
  })),
}));

vi.mock('@qdrant/js-client-rest', () => ({
  QdrantClient: vi.fn().mockImplementation(() => ({
    search: vi.fn().mockResolvedValue([
      { payload: { page_content: 'Project A' } },
      { payload: { page_content: 'Project B' } },
    ]),
  })),
}));

vi.mock('@openrouter/ai-sdk-provider', () => ({
  createOpenRouter: vi.fn().mockReturnValue(() => ({ id: 'mock-model' })),
}));

vi.mock('ai', async () => {
  return {
    streamText: vi.fn().mockImplementation(({ messages }) => {
      // Return a minimal mock that provides toDataStreamResponse()
      return {
        toDataStreamResponse: () => new Response('mock-stream', { status: 200 }),
      } as any;
    }),
  };
});

// Mock contentlayer data the route consumes
vi.mock('contentlayer/generated', () => ({
  allPortfolios: [
    { title: 'X', description: 'Dx', skills: ['ts'] },
    { title: 'Y', description: 'Dy', skills: ['react'] },
  ],
}));

describe('POST /api/chat', () => {
  it('returns a Response and status 200', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
      headers: { 'content-type': 'application/json' },
    });

    const res = await POST(req);
    expect(res).toBeInstanceOf(Response);
    expect(res.status).toBe(200);
  });
});


