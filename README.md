# gaussian-ts

A Typescript model of the [Normal](http://en.wikipedia.org/wiki/Normal_distribution)
(or Gaussian) distribution.

## API

### Creating a Distribution

```typescript
import { Gaussian } from "gaussian";
const distribution = new Gaussian(mean, variance);
const cdf = distribution.cdf(25);
```

### Properties

- `mean`: the mean (μ) of the distribution
- `variance`: the variance (σ^2) of the distribution
- `standardDeviation`: the standard deviation (σ) of the distribution

### Probability Functions

- `pdf(x)`: the probability density function, which describes the probability
  of a random variable taking on the value _x_
- `cdf(x)`: the cumulative distribution function, which describes the
  probability of a random variable falling in the interval (−∞, _x_]
- `ppf(x)`: the percent point function, the inverse of _cdf_

### Combination Functions

- `add(d)`: returns the result of adding this and the given distribution's means and variances
- `sub(d)`: returns the result of subtracting this and the given distribution's means and variances
- `scale(c)`: returns the result of scaling this distribution by the given constant
