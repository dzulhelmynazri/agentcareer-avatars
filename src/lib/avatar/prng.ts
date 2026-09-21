/**
 * Deterministic PRNG and hashing for seed-based avatar generation.
 * Uses 32-bit FNV-1a hash algorithm combined with xorshift.
 */

export function hashSeed(seed: string): number {
  let h = 2_166_136_261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16_777_619);
  }
  return h >>> 0;
}

export class SeedPRNG {
  private state: number;

  constructor(seed: string | number) {
    this.state = typeof seed === "number" ? seed >>> 0 || 1 : hashSeed(seed);
    if (this.state === 0) {
      this.state = 1;
    }
  }

  /**
   * Returns a pseudo-random 32-bit unsigned integer.
   */
  nextUint32(): number {
    let x = this.state;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.state = x >>> 0;
    return this.state;
  }

  /**
   * Returns a float in [0, 1).
   */
  nextFloat(): number {
    return (this.nextUint32() >>> 0) / 4_294_967_296;
  }

  /**
   * Picks a random element from an array.
   */
  pick<T>(array: readonly T[]): T {
    if (array.length === 0) {
      throw new Error("Cannot pick from an empty array");
    }
    const index = Math.floor(this.nextFloat() * array.length);
    return array[index]!;
  }
}
