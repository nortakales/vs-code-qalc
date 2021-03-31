
const builtInUnits = "atto|a|centi|c|deca|da|deci|d|exa|E|exi|Ei|femto|f|gibi|Gi|giga|G|hecto|h|kibi|Ki|kilo|k|mebi|Mi|mega|M|micro|u|milli|m|nano|n|pebi|Pi|peta|P|pico|p|tebi|Ti|tera|T|yobi|Yi|yocto|y|yotta|Y|zebi|Zi|zepto|z|zetta|Z)?(meter|m|inch|in|foot|feet|ft|yard|yd|mile|mi|link|li|rod|rd|chain|ch|angstrom|mil|m2|sqin|sqft|sqyd|sqmi|sqrd|sqch|sqmil|acre|hectare|m3|litre|l|L|lt|liter|cc|cuin|cuft|cuyd|teaspoon|tablespoon|minim|min|fluiddram|fldr|fluidounce|floz|gill|gi|cup|cp|pint|pt|quart|qt|gallon|gal|beerbarrel|bbl|oilbarrel|obl|hogshead|drop|gtt|rad|radian|deg|degree|grad|gradian|cycle|arcsec|arcsecond|arcmin|arcminute|second|s|sec|minute|min|hour|h|hr|day|week|month|year|decade|century|centuries|millennium|millennia|hertz|Hz|gram|g|tonne|ton|grain|gr|dram|dr|ounce|oz|poundmass|lbm|lb|lbs|hundredweight|cwt|stick|stone|ampere|A|kelvin|K|celsius|degC|fahrenheit|degF|rankine|degR|mole|mol|candela|cd|newton|N|dyne|dyn|poundforce|lbf|kip|joule|J|erg|Wh|BTU|electronvolt|eV|watt|W|hp|Pa|psi|atm|torr|bar|mmHg|mmH2O|cmH2O|ampere|A|coulomb|C|watt|W|volt|V|ohm|farad|F|weber|Wb|tesla|T|henry|H|siemens|S|electronvolt|eV|bits|b|bytes|B";

const builtInConstants = "speedOfLight|gravitationConstant|planckConstant|reducedPlanckConstant|magneticConstant|electricConstant|vacuumImpedance|coulomb|elementaryCharge|bohrMagneton|conductanceQuantum|inverseConductanceQuantum|magneticFluxQuantum|nuclearMagneton|klitzing|bohrRadius|classicalElectronRadius|electronMass|fermiCoupling|fineStructure|hartreeEnergy|protonMass|deuteronMass|neutronMass|quantumOfCirculation|rydberg|thomsonCrossSection|weakMixingAngle|efimovFactor|atomicMass|avogadro|boltzmann|faraday|firstRadiation|loschmidt|gasConstant|molarPlanckConstant|molarVolume|sackurTetrode|secondRadiation|stefanBoltzmann|wienDisplacement|molarMass|molarMassC12|gravity|atm|planckLength|planckMass|planckTime|planckCharge|planckTemperature|e|E|i|Infinity|LN2|LN10|LOG2E|LOG10E|NaN|null|phi|pi|PI|SQRT1_2|SQRT2|tau|undefined|version";

const builtInFunctions = "compile|evaluate|help|parser|derivative|lsolve|lsolveAll|lup|lusolve|qr|rationalize|simplify|slu|usolve|usolveAll|abs|add|cbrt|ceil|cube|divide|dotDivide|dotMultiply|dotPow|exp|expm1|fix|floor|gcd|hypot|lcm|log|log10|log1p|log2|mod|multiply|norm|nthRoot|nthRoots|pow|round|sign|sqrt|square|subtract|unaryMinus|unaryPlus|xgcd|bitAnd|bitNot|bitOr|bitXor|leftShift|rightArithShift|rightLogShift|bellNumbers|catalan|composition|stirlingS2|arg|conj|im|re|distance|intersect|and|not|or|xor|apply|column|concat|count|cross|ctranspose|det|diag|diff|dot|eigs|expm|filter|flatten|forEach|getMatrixDataType|identity|inv|kron|map|ones|partitionSelect|range|reshape|resize|rotate|rotationMatrix|row|size|sort|sqrtm|squeeze|subset|trace|transpose|zeros|combinations|combinationsWithRep|factorial|gamma|kldivergence|multinomial|permutations|pickRandom|random|randomInt|compare|compareNatural|compareText|deepEqual|equal|equalText|larger|largerEq|smaller|smallerEq|unequal|setCartesian|setDifference|setDistinct|setIntersect|setIsSubset|setMultiplicity|setPowerset|setSize|setSymDifference|setUnion|erf|mad|max|mean|median|min|mode|prod|quantileSeq|std|sum|variance|bin|format|hex|oct|print|acos|acosh|acot|acoth|acsc|acsch|asec|asech|asin|asinh|atan|atan2|atanh|cos|cosh|cot|coth|csc|csch|sec|sech|sin|sinh|tan|tanh|to|clone|hasNumericValue|isInteger|isNaN|isNegative|isNumeric|isPositive|isPrime|isZero|numeric|typeOf";

const currencySymbols = "CAD|HKD|ISK|PHP|DKK|HUF|CZK|GBP|RON|SEK|IDR|INR|BRL|RUB|HRK|JPY|THB|CHF|EUR|MYR|BGN|TRY|CNY|NOK|NZD|ZAR|USD|MXN|SGD|AUD|ILS|KRW|PLN|USD";

const additionalUnits = "px|pixel|pixels|pt|point|points|em|oF|oC|mph|kph";

const additionalConstants = "today|tomorrow|now|time|yesterday|sum|total|average|avg";

const additionalKeywords = "in|to|last|off|of|mod|xor|or|ago";

export const allKeywords = [
    builtInUnits,
    builtInConstants,
    builtInFunctions,
    currencySymbols,
    additionalUnits,
    additionalConstants,
    additionalKeywords
].join("|");