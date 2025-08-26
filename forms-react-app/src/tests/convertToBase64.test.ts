import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { toBase64 } from '../utils/convertToBse64';

describe('toBase64', () => {
    let originalFileReader: typeof FileReader;

    beforeEach(() => {
        originalFileReader = globalThis.FileReader;
    });

    afterEach(() => {
        globalThis.FileReader = originalFileReader;
        vi.restoreAllMocks();
    });

    it('converts a file to base64 string', async () => {
        const mockResult = 'data:text/plain;base64,Zm9vYmFy';

        const mockFileReader = {
            readAsDataURL: vi.fn(),
            onloadend: null as null | (() => void),
            onerror: null as null | (() => void),
            result: mockResult,
        };

        globalThis.FileReader = vi.fn(
            () => mockFileReader
        ) as unknown as typeof FileReader;

        const file = new File(['foo'], 'foo.txt', { type: 'text/plain' });

        const promise = toBase64(file);
        if (mockFileReader.onloadend) {
            mockFileReader.onloadend();
        }

        const result = await promise;
        expect(result).toBe(mockResult);
        expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file);
    });

    it('rejects when FileReader errors', async () => {
        const mockFileReader = {
            readAsDataURL: vi.fn(),
            onloadend: null as null | (() => void),
            onerror: null as null | (() => void),
            result: null,
        };

        globalThis.FileReader = vi.fn(
            () => mockFileReader
        ) as unknown as typeof FileReader;

        const file = new File(['foo'], 'foo.txt', { type: 'text/plain' });

        const promise = toBase64(file);
        if (mockFileReader.onerror) {
            mockFileReader.onerror();
        }

        await expect(promise).rejects.toThrow('read error');
    });
});
