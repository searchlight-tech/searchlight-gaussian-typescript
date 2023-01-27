[![Tests](https://github.com/searchlight-tech/-searchlight-gaussian-typescript/workflows/tests/badge.svg)](https://github.com/searchlight-tech/-searchlight-gaussian-typescript/actions/workflows/test.yml)

# gaussian-ts

A Typescript model of the [Normal](http://en.wikipedia.org/wiki/Normal_distribution)
(or Gaussian) distribution.

## API

### Creating a Distribution

```typescript
import { Gaussian } from "gaussian";
const distribution = new Gaussian(mean, variance);
const cdf = distribution.cdf(25);

cdf.add(new Gaussian(1,2))
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
- `mul(d)`: updates the product distribution of this and the given distribution;
- `div(d)`: updates the quotient distribution of this and the given distribution;
- `mul_constant(d)`: updates `scale(d)`; equivalent to calling `mul(d: number)`
- `div_constant(d)`: updates `scale(1/d)`; equivalent to calling `div(d: number)`
- `add(d)`: updates the result of adding this and the given distribution's means and variances
- `sub(d)`: updates the result of subtracting this and the given distribution's means and variances
- `scale(c)`: updates the result of scaling this distribution by the given constant


### Differences with the original gaussian package
The original package while great creates a new Gaussian object on every combination function.
One slight optimization in this library is that rather than creating a new Gaussian object 
on every call, we will update our Gaussian's objects instance variables.

### Forked From

__Source__: https://github.com/errcw/gaussian  