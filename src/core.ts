import {
  buildFfiLibrary,
  buildNumericPointer,
  CharArray,
  double,
  DoubleArray,
  long,
  LongArray,
} from './ffiLibrary';

/**
 * A tuple that represents the result of an Ivium function call. The first element is a number indicating the result code, and the second element is the actual result of the function.
 * @template T The type of the actual result of the function. Can be a string or a number (default is number).
 */
type IviumResult<T extends string | number | number[]> = [number, T];

/**
 * The core class that provides access to Ivium functionality.
 */
class Core {
  /**
   * A private static field that indicates whether the Ivium driver is open.
   */
  static #isDriverOpen = false;

  /**
   * A read-only private static field that holds the FFI library object.
   */
  static readonly #lib = buildFfiLibrary();

  // #######################
  // ## GENERIC FUNCTIONS ##
  // #######################

  /**
   * Opens the Ivium driver.
   *
   * @returns The result code of the operation.
   */
  static IV_open(): number {
    Core.#isDriverOpen = true;
    return Core.#lib.IV_open();
  }

  /**
   * Closes the Ivium driver.
   *
   * @returns The result code of the operation.
   */
  static IV_close(): number {
    Core.#isDriverOpen = false;
    return Core.#lib.IV_close();
  }

  /**
   * Determines whether the Ivium driver is open.
   *
   * @returns A boolean value indicating whether the driver is open.
   */
  static isDriverOpen(): boolean {
    return Core.#isDriverOpen;
  }

  /**
   * Gets the maximum number of devices supported by the Ivium library.
   *
   * @returns The maximum number of devices.
   */
  static IV_MaxDevices(): number {
    return Core.#lib.IV_MaxDevices();
  }

  /**
   * Selects a specific device based on its Ivium soft instance number.
   *
   * @param iviumsoftInstanceNumber - The Ivium soft instance number of the device to select.
   * @returns A tuple containing the result code of the operation and the Ivium soft instance number of the selected device.
   */
  static IV_selectdevice(iviumsoftInstanceNumber: number): IviumResult<number> {
    const instanceNumberArray = new LongArray([iviumsoftInstanceNumber]);

    const resultCode = Core.#lib.IV_selectdevice(instanceNumberArray);

    return [resultCode, instanceNumberArray[0]];
  }

  /**
   * Reads the serial number of the currently selected device.
   *
   * @returns A tuple containing the result code of the operation and the serial number of the device.
   */
  static IV_readSN(): IviumResult<string> {
    const deviceSerialNumberPtr = new CharArray(16);

    const resultCode = Core.#lib.IV_readSN(deviceSerialNumberPtr);

    return [resultCode, deviceSerialNumberPtr.buffer.readCString()];
  }

  /**
   * Connects to the Ivium device.
   * @param connectionStatus A number indicating the connection status.
   * @returns An IviumResult tuple containing the result code and the updated connection status.
   */
  static IV_connect(connectionStatus: number): IviumResult<number> {
    const connectionStatusArray = new LongArray([connectionStatus]);

    const resultCode = Core.#lib.IV_connect(connectionStatusArray);

    return [resultCode, connectionStatusArray[0]];
  }

  /**
   * Returns the version host.
   * @returns {number} An IviumResult tuple containing the result code and the version host.
   */
  static IV_VersionHost(versionHost: number): IviumResult<number> {
    const versionHostArray = new LongArray([versionHost]);

    const resultCode = Core.#lib.IV_VersionHost(versionHostArray);

    return [resultCode, versionHostArray[0]];
  }

  /**
   * Returns the version of the IviumSoft driver DLL.
   * @returns {number} The version of the IviumSoft driver DLL.
   */
  static IV_VersionDll(): number {
    return Core.#lib.IV_VersionDll();
  }

  /**
   * It returns 1 if the selected instance of IviumSoft is running.
   * @returns {number}.
   */
  static IV_VersionCheck(): number {
    return Core.#lib.IV_VersionCheck();
  }

  /**
   * Returns the handle of the host.
   * @returns {number} The handle of the host.
   */
  static IV_HostHandle(): number {
    return Core.#lib.IV_HostHandle();
  }

  /**
   * Returns the version of the DLL file.
   * @returns {number} The version of the DLL file.
   */
  static IV_VersionDllFile(): number {
    return Core.#lib.IV_VersionDllFile();
  }

  /**
   * Returns the version of the DLL file as a string.
   * @returns {number} The version of the DLL file as a string.
   */
  static IV_VersionDllFileStr(): number {
    return Core.#lib.IV_VersionDllFileStr();
  }

  /**
   * Sending the integer value communicates with Multichannel control:
            if not yet active, the [int] number of tabs is automatically opened and the [int] tab becomes active;
            if Ivium-n-Soft is active already, the [int] tab becomes active. 
            Now the channel/instrument that is connected to this tab can be controlled. 
            If no instrument is connected, the next available instrument in the list can be connected (IV_connect) and controlled.
   * @param {number} channelNumber The channel number to select.
   * @returns {number} The result of selecting the specified channel.
   */
  static IV_SelectChannel(channelNumber: number): number {
    const channelNumberArray = new LongArray([channelNumber]);

    return Core.#lib.IV_VersionHost(channelNumberArray);
  }

  // ###########################
  // ## DIRECT MODE FUNCTIONS ##
  // ###########################

  /**
   * Returns the corresponding cell status label ["I_ovl", "Anin1_ovl","E_ovl", "CellOff_button pressed", "Cell on"]
   * @returns {number} The cell status label.
   */
  static IV_getcellstatus(): IviumResult<number> {
    const cellStatusArray = new LongArray(1);

    const resultCode = Core.#lib.IV_getcellstatus(cellStatusArray);

    return [resultCode, cellStatusArray[0]];
  }

  /**
   * Sets the connection mode for the Ivium device.
   * @param connectionModeNumber - The connection mode number.
   * @returns An IviumResult containing the result code and the updated connection mode number.
   */
  static IV_setconnectionmode(
    connectionModeNumber: number
  ): IviumResult<number> {
    const connectionModeNumberArray = new LongArray([connectionModeNumber]);

    const resultCode = Core.#lib.IV_setconnectionmode(
      connectionModeNumberArray
    );

    return [resultCode, connectionModeNumberArray[0]];
  }

  /**
   * Set cell on off to close cell relais (0=off;1=on)
   * @param {number} cellOnModeNumber - The cell on mode number.
   * @returns {number} The result of setting the cell on mode.
   */
  static IV_setcellon(cellOnModeNumber: number): number {
    const cellOnModeNumberArray = new LongArray([cellOnModeNumber]);

    return Core.#lib.IV_setcellon(cellOnModeNumberArray);
  }

  /**
   * Set cell potential
   * @param {number} potential - The potential to set.
   * @returns {number} The result of setting the cell potential.
   */
  static IV_setpotential(potential: number): number {
    const potentialArray = new DoubleArray([potential]);

    return Core.#lib.IV_setpotential(potentialArray);
  }

  /**
   * Set BiStat offset potential
   * @param {number} potentialWe2 - The potential to set.
   * @returns {number} The result of setting the cell potential.
   */
  static IV_setpotentialWE2(potentialWe2: number): number {
    const potentialArray = new DoubleArray([potentialWe2]);

    return Core.#lib.IV_setpotentialWE2(potentialArray);
  }

  /**
   * Set cell current
   * @param {number} current - The current to set.
   * @returns {number} The result of setting the cell current.
   */
  static IV_setcurrent(current: number): number {
    const currentArray = new DoubleArray([current]);

    return Core.#lib.IV_setcurrent(currentArray);
  }

  /**
   * Get measured cell potential
   * @returns An IviumResult containing the result code and the measured cell potential.
   */
  static IV_getpotential(): IviumResult<number> {
    const potentialArray = new DoubleArray(1);

    const resultCode = Core.#lib.IV_getpotential(potentialArray);

    return [resultCode, potentialArray[0]];
  }

  /**
   * Get measured BiStat offset potential
   * @returns The measured cell potential.
   */
  static IV_setcurrentrange(currentRange: number): number {
    const currentRangeArray = new LongArray([currentRange]);

    return Core.#lib.IV_setcurrentrange(currentRangeArray);
  }

  // ###########################
  // ## WE32 MODE FUNCTIONS ##
  // ###########################

  // ###########################
  // ## METHOD MODE FUNCTIONS ##
  // ###########################

  /**
   * Loads method procedure previously saved to a file.
   * @param {string} methodFilePath - The path to the method file.
   * @returns {IviumResult<string>} A tuple containing the result code and the method file path.
   */
  static IV_readmethod(methodFilePath: string): IviumResult<string> {
    const resultCode = Core.#lib.IV_readmethod(methodFilePath);

    return [resultCode, methodFilePath];
  }

  /**
   * Saves currently loaded method procedure to a file.
   * @param {string} methodFilePath - The path to the method file.
   * @returns {IviumResult<string>} A tuple containing the result code and the method file path.
   */
  static IV_savemethod(methodFilePath: string): IviumResult<string> {
    const resultCode = Core.#lib.IV_savemethod(methodFilePath);

    return [resultCode, methodFilePath];
  }

  /**
   * Starts a method procedure.
   * If method_file_path is an empty string then the presently loaded procedure is started.
   * If the full path to a previously saved method is provided
   * then the procedure is loaded from the file and started.
   * @param {string} [methodFilePath=''] - The path to the method file. If not specified, the current method will be used.
   * @returns {IviumResult<string>} A tuple containing the result code and the method file path.
   */
  static IV_startmethod(methodFilePath = ''): IviumResult<string> {
    const resultCode = Core.#lib.IV_startmethod(methodFilePath);

    return [resultCode, methodFilePath];
  }

  /**
   * Aborts the ongoing method procedure.
   * @returns {number} The result code.
   */
  static IV_abort(): number {
    return Core.#lib.IV_abort();
  }

  /**
   * Saves the results of the last method execution into a file.
   * @param {string} methodDataFilePath - The full path to the new file..
   * @returns {IviumResult<string>} A tuple containing the result code and the method data file path.
   */
  static IV_savedata(methodDataFilePath: string): IviumResult<string> {
    const resultCode = Core.#lib.IV_savedata(methodDataFilePath);

    return [resultCode, methodDataFilePath];
  }

  /**
   * Allows updating the parameter values for the currently loaded method procedrue.
   * It only works for text based parameters and dropdowns (multiple option selectors).
   * @param {string} parameterName - The name of the parameter to set.
   * @param {string} parameterValue - The value to set the parameter to.
   * @returns {number} The result code of the function call.
   */ static IV_setmethodparameter(
    parameterName: string,
    parameterValue: string
  ) {
    return Core.#lib.IV_setmethodparameter(parameterName, parameterValue);
  }

  /**
   * Returns actual available number of datapoints: indicates the progress during a run.
   * @returns {IviumResult<number>} The result of the function call, with the number of data points as the second element.
   */
  static IV_Ndatapoints(): IviumResult<number> {
    const dataPointArray = new LongArray(1);

    return [Core.#lib.IV_Ndatapoints(dataPointArray), dataPointArray[0]];
  }

  /**
   * Returns the data from a datapoint with index int, returns 3 values that depend on
   * the used technique. For example LSV/CV methods return (E/I/0) Transient methods
   * return (time/I,E/0), Impedance methods return (Z1,Z2,freq) etc.
   * @param {number} dataPointIndex - The index of the data point to retrieve data for.
   * @returns {IviumResult<number[]>} The result of the function call, with the data for the specified data point as the second element (an array of three numbers).
   */ static IV_getdata(dataPointIndex: number): IviumResult<number[]> {
    const selectedDataPointIndexPtr = buildNumericPointer(long, dataPointIndex);

    const measuredValue1Ptr = buildNumericPointer(double);
    const measuredValue2Ptr = buildNumericPointer(double);
    const measuredValue3Ptr = buildNumericPointer(double);

    // build a pointer to doble with the

    const resultCode = Core.#lib.IV_getdata(
      selectedDataPointIndexPtr,
      measuredValue1Ptr,
      measuredValue2Ptr,
      measuredValue3Ptr
    );

    return [
      resultCode,
      [
        measuredValue1Ptr.deref(),
        measuredValue2Ptr.deref(),
        measuredValue3Ptr.deref(),
      ],
    ];
  }

  /**
   * Same as get_data_point, but with the additional scan_index parameter.
   * This function will allow reading data from non-selected (previous) scans.
   * @param {number} dataPointIndex - The index of the data point to retrieve data from.
   * @param {number} scanIndex - The index of the scan to retrieve data from.
   * @returns {IviumResult<number[]>} - An array with the result code as the first element, and an array of measured values as the second element.
   */
  static IV_getdatafromline(
    dataPointIndex: number,
    scanIndex: number
  ): IviumResult<number[]> {
    const selectedDataPointIndexPtr = buildNumericPointer(long, dataPointIndex);
    const scanIndexPtr = buildNumericPointer(long, scanIndex);

    const measuredValue1Ptr = buildNumericPointer(double);
    const measuredValue2Ptr = buildNumericPointer(double);
    const measuredValue3Ptr = buildNumericPointer(double);

    const resultCode = Core.#lib.IV_getdatafromline(
      selectedDataPointIndexPtr,
      scanIndexPtr,
      measuredValue1Ptr,
      measuredValue2Ptr,
      measuredValue3Ptr
    );

    return [
      resultCode,
      [
        measuredValue1Ptr.deref(),
        measuredValue2Ptr.deref(),
        measuredValue3Ptr.deref(),
      ],
    ];
  }
}

export default Core;
