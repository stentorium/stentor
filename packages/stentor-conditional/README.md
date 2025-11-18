### stentor-conditional

Conditionals are objects with key `conditions` that are strings with simple expressions.

The conditional determiner will take an array of conditionals and evaluate each condition and return an array of all the conditionals that returned true.

### VM

By default, it uses the built-in Node VM but if you install [vm2](https://github.com/patriksimek/vm2) or [isolated-vm](https://github.com/laverdet/isolated-vm), it will then prefer either of those as your VM environment.

Note: `isolated-vm` is not in the `optionalDependencies` of the package.json as it causes a lot of noisy output during the installation process since it requires python.
