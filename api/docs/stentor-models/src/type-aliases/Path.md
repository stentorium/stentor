[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Path

# Type Alias: Path

> **Path** = [`ExecutablePath`](../interfaces/ExecutablePath.md) \| [`CompilablePath`](CompilablePath.md) \| [`RequestDependentPath`](RequestDependentPath.md) \| [`SlotDependentPath`](SlotDependentPath.md) \| [`StorageDependentPath`](StorageDependentPath.md) \| [`JSONDependentPath`](JSONDependentPath.md) \| [`SystemDependentPath`](SystemDependentPath.md)

Defined in: [packages/stentor-models/src/Path/Path.ts:107](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Path/Path.ts#L107)

A path determines where to redirect or forward an incoming request.  They can either
be predetermined (ExecutablePath) or determined at runtime (CompilablePath).  Additionally,
they can have rules associated with them to only apply them at certain situations.
