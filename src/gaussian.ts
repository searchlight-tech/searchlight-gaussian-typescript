// const PRECISION = 1e9;

export class Gaussian {
  declare mean;
  declare variance;
  declare standardDeviation;
  constructor(mean: number, variance: number) {
    if (variance <= 0) {
      throw new Error("Variance must be > 0 (but was " + variance + ")");
    }
    this.mean = mean;
    this.variance = variance;
    this.standardDeviation = Math.sqrt(variance);
  }

  public static erfc(x: number) {
    const z = Math.abs(x);
    const t = 1 / (1 + z / 2);
    const r =
      t *
      Math.exp(
        -z * z -
          1.26551223 +
          t *
            (1.00002368 +
              t *
                (0.37409196 +
                  t *
                    (0.09678418 +
                      t *
                        (-0.18628806 +
                          t *
                            (0.27886807 +
                              t *
                                (-1.13520398 +
                                  t *
                                    (1.48851587 +
                                      t * (-0.82215223 + t * 0.17087277))))))))
      );
    return x >= 0 ? r : 2 - r;
  }

  // Inverse complementary error function
  // From Numerical Recipes 3e p265
  static ierfc(x: number) {
    if (x >= 2) {
      return -100;
    }
    if (x <= 0) {
      return 100;
    }

    const xx = x < 1 ? x : 2 - x;
    const t = Math.sqrt(-2 * Math.log(xx / 2));

    let r =
      -0.70711 *
      ((2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t);

    for (let j = 0; j < 2; j++) {
      const err = Gaussian.erfc(r) - xx;
      r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
    }

    return x < 1 ? r : -r;
  }

  static generateGaussian(mean: number, std: number): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const _2PI = Math.PI * 2;

    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(_2PI * u2);
    //   const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(_2PI * u2);

    return z0 * std + mean;
  }

  pdf(x: number) {
    const m = this.standardDeviation * Math.sqrt(2 * Math.PI);
    const e = Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance));
    return e / m;
  }
  cdf(x: number) {
    return (
      0.5 *
      Gaussian.erfc(-(x - this.mean) / (this.standardDeviation * Math.sqrt(2)))
    );
  }
  // Percent point function
  ppf(x: number) {
    return (
      this.mean - this.standardDeviation * Math.sqrt(2) * Gaussian.ierfc(2 * x)
    );
  }
  random(num: number): Array<number> {
    const mean = this.mean;
    const std = this.standardDeviation;
    return Array(num)
      .fill(0)
      .map(() => Gaussian.generateGaussian(mean, std));
  }

  // Addition of this and d
  add(d: Gaussian): Gaussian {
    this.mean += d.mean;
    this.variance += d.variance;
    return this;
  }

  // Subtraction of this and d
  sub(d: Gaussian): Gaussian {
    this.mean -= d.mean;
    this.variance += d.variance;
    return this;
  }
  // Scale this by constant c
  scale(c: number) {
    this.mean * c;
    this.variance * c ** 2;
    return this;
  }
}
