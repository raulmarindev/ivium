# IviumJS

Tiny NodeJS wrapper around the "Software development driver DLL" for IviumSoft.

# Important:

This module uses a dll from the IviumSoft application. You need to have this software installed on a Windows machine. The IviumSoft application can be downloaded from here: https://www.ivium.com/support/#Software%20update

## Installation

Install IviumJS easily with npm:

```
npm install ivium
```

## Usage Example (Using IviumSoft Core functions)

To use the same functions available in the "IviumSoft driver DLL" you can import the Core class as follows. All functions return a result code (integer) and a result value if available. For further information you can check the IviumSoft documentation.

```
import {Core} from 'ivium'

Core.IV_open()
Core.IV_getdevicestatus()
Core.IV_close()
```

## Usage Example (Using Ivium methods)

This is a wrapper around the Core functions that adds a few things:

- Exception management (you can find an example [here](https://github.com/SF-Tec/ivium/blob/main/docs/error_management.md)
- New functionalities

```
import {Ivium} from 'ivium'

Ivium.open_driver()
Ivium.get_device_status()
Ivium.close_driver()

```

## Supported functions

The list of currently supported and implemented functions can be found [here](https://github.com/SF-Tec/ivium/blob/main/docs/method_list.md).

## Links

- [See on GitHub](https://github.com/sf-tec/ivium)
<!-- - [See on PyPI](https://pypi.org/project/ivium) -->
