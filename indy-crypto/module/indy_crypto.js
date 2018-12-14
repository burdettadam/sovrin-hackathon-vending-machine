/* tslint:disable */
import * as wasm from './indy_crypto_bg';

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}
/**
* @returns {any}
*/
export function blsGenerator() {
    return takeObject(wasm.blsGenerator());
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
* @param {any} arg0
* @returns {Uint8Array}
*/
export function blsGeneratorAsBytes(arg0) {
    const retptr = globalArgumentPtr();
    try {
        wasm.blsGeneratorAsBytes(retptr, addBorrowedObject(arg0));
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        heap[stack_pointer++] = undefined;

    }

}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {Uint8Array} arg0
* @returns {any}
*/
export function blsGeneratorFromBytes(arg0) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    try {
        return takeObject(wasm.blsGeneratorFromBytes(ptr0, len0));

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

}

function isLikeNone(x) {
    return x === undefined || x === null;
}
/**
* @param {Uint8Array} arg0
* @returns {any}
*/
export function blsSignKey(arg0) {
    const ptr0 = isLikeNone(arg0) ? [0, 0] : passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    return takeObject(wasm.blsSignKey(ptr0, len0));
}

/**
* @param {any} arg0
* @returns {Uint8Array}
*/
export function blsSignKeyAsBytes(arg0) {
    const retptr = globalArgumentPtr();
    try {
        wasm.blsSignKeyAsBytes(retptr, addBorrowedObject(arg0));
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {Uint8Array} arg0
* @returns {any}
*/
export function blsSignKeyFromBytes(arg0) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    try {
        return takeObject(wasm.blsSignKeyFromBytes(ptr0, len0));

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

}

/**
* @param {Uint8Array} arg0
* @param {any} arg1
* @returns {any}
*/
export function blsSign(arg0, arg1) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    try {
        return takeObject(wasm.blsSign(ptr0, len0, addBorrowedObject(arg1)));

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {any} arg0
* @param {any} arg1
* @returns {any}
*/
export function blsVerKey(arg0, arg1) {
    try {
        return takeObject(wasm.blsVerKey(addBorrowedObject(arg0), addBorrowedObject(arg1)));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {any} arg0
* @returns {Uint8Array}
*/
export function blsVerKeyAsBytes(arg0) {
    const retptr = globalArgumentPtr();
    try {
        wasm.blsVerKeyAsBytes(retptr, addBorrowedObject(arg0));
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {Uint8Array} arg0
* @returns {any}
*/
export function blsVerKeyFromBytes(arg0) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    try {
        return takeObject(wasm.blsVerKeyFromBytes(ptr0, len0));

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

}

/**
* @param {any} arg0
* @param {any} arg1
* @returns {any}
*/
export function blsProofOfPossession(arg0, arg1) {
    try {
        return takeObject(wasm.blsProofOfPossession(addBorrowedObject(arg0), addBorrowedObject(arg1)));

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {any} arg0
* @returns {Uint8Array}
*/
export function blsProofOfPossessionAsBytes(arg0) {
    const retptr = globalArgumentPtr();
    try {
        wasm.blsProofOfPossessionAsBytes(retptr, addBorrowedObject(arg0));
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {Uint8Array} arg0
* @returns {any}
*/
export function blsProofOfPossessionFromBytes(arg0) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    try {
        return takeObject(wasm.blsProofOfPossessionFromBytes(ptr0, len0));

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function passArrayJsValueToWasm(array) {
    const ptr = wasm.__wbindgen_malloc(array.length * 4);
    const mem = getUint32Memory();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
/**
* @param {any[]} arg0
* @returns {any}
*/
export function blsMultiSignature(arg0) {
    const ptr0 = passArrayJsValueToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    return takeObject(wasm.blsMultiSignature(ptr0, len0));
}

/**
* @param {any} arg0
* @returns {Uint8Array}
*/
export function blsMultiSignatureAsBytes(arg0) {
    const retptr = globalArgumentPtr();
    try {
        wasm.blsMultiSignatureAsBytes(retptr, addBorrowedObject(arg0));
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {Uint8Array} arg0
* @returns {any}
*/
export function blsMultiSignatureFromBytes(arg0) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    try {
        return takeObject(wasm.blsMultiSignatureFromBytes(ptr0, len0));

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

}

/**
* @param {any} arg0
* @param {Uint8Array} arg1
* @param {any} arg2
* @param {any} arg3
* @returns {boolean}
*/
export function blsVerify(arg0, arg1, arg2, arg3) {
    const ptr1 = passArray8ToWasm(arg1);
    const len1 = WASM_VECTOR_LEN;
    try {
        return (wasm.blsVerify(addBorrowedObject(arg0), ptr1, len1, addBorrowedObject(arg2), addBorrowedObject(arg3))) !== 0;

    } finally {
        heap[stack_pointer++] = undefined;
        wasm.__wbindgen_free(ptr1, len1 * 1);
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {any} arg0
* @param {any} arg1
* @param {any} arg2
* @returns {boolean}
*/
export function blsVerifyProofOfPossession(arg0, arg1, arg2) {
    try {
        return (wasm.blsVerifyProofOfPossession(addBorrowedObject(arg0), addBorrowedObject(arg1), addBorrowedObject(arg2))) !== 0;

    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {any} arg0
* @param {Uint8Array} arg1
* @param {any[]} arg2
* @param {any} arg3
* @returns {boolean}
*/
export function blsVerifyMultiSig(arg0, arg1, arg2, arg3) {
    const ptr1 = passArray8ToWasm(arg1);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArrayJsValueToWasm(arg2);
    const len2 = WASM_VECTOR_LEN;
    try {
        return (wasm.blsVerifyMultiSig(addBorrowedObject(arg0), ptr1, len1, ptr2, len2, addBorrowedObject(arg3))) !== 0;

    } finally {
        heap[stack_pointer++] = undefined;
        wasm.__wbindgen_free(ptr1, len1 * 1);
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {any} arg0
* @returns {Uint8Array}
*/
export function blsSignatureAsBytes(arg0) {
    const retptr = globalArgumentPtr();
    try {
        wasm.blsSignatureAsBytes(retptr, addBorrowedObject(arg0));
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        heap[stack_pointer++] = undefined;

    }

}

/**
* @param {Uint8Array} arg0
* @returns {any}
*/
export function blsSignatureFromBytes(arg0) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    try {
        return takeObject(wasm.blsSignatureFromBytes(ptr0, len0));

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

}

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_new_baf10398b0d0c64d(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

export function __wbg_call_173f04c850a68d5f(arg0, arg1) {
    return addHeapObject(getObject(arg0).call(getObject(arg1)));
}

export function __wbg_self_58232ab37cbe6608(arg0) {
    return addHeapObject(getObject(arg0).self);
}

export function __wbg_crypto_329b714d7e7d321d(arg0) {
    return addHeapObject(getObject(arg0).crypto);
}

export function __wbg_getRandomValues_2f960218fce3a102(arg0) {
    return addHeapObject(getObject(arg0).getRandomValues);
}

export function __wbg_getRandomValues_5581e85fc6616df6(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).getRandomValues(varg1);
}

export function __wbg_require_4a70cbfd3adc73a8(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(require(varg0));
}

export function __wbg_randomFillSync_355c3fcfa754fa4e(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).randomFillSync(varg1);
}

export function __wbindgen_object_drop_ref(i) { dropObject(i); }

export function __wbindgen_is_undefined(idx) {
    return getObject(idx) === undefined ? 1 : 0;
}

export function __wbindgen_json_parse(ptr, len) {
    return addHeapObject(JSON.parse(getStringFromWasm(ptr, len)));
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? require('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
}

export function __wbindgen_json_serialize(idx, ptrptr) {
    const ptr = passStringToWasm(JSON.stringify(getObject(idx)));
    getUint32Memory()[ptrptr / 4] = ptr;
    return WASM_VECTOR_LEN;
}

export function __wbindgen_jsval_eq(a, b) {
    return getObject(a) === getObject(b) ? 1 : 0;
}

export function __wbindgen_rethrow(idx) { throw takeObject(idx); }

