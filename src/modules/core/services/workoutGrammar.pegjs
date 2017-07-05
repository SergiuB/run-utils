{ 
    function leftAssoc(rest, val) {
        if (!rest.length) return val;
        var last = rest.pop();
        var left = leftAssoc(rest, last[0]);
        return left.length? [...left, val] : [left, val];
    }
}

Start = E1

E1 = rest:(E2 "+")* v:E2 { return leftAssoc(rest, v); }

E2 = times:Number '*' work:WorkoutPart { return {times, work} }
	/ WorkoutPart
            
WorkoutPart = Segment
			/ BracketedExpression
            
BracketedExpression = "(" seq:E1 ")" { return seq; }

Segment = work:BasicSegment type:SegmentType "/" rest:BasicSegment { return {work, type, rest}; }
		/ work:BasicSegment type:SegmentType { return {work, type}; }

BasicSegment = num:Number unit:(TimeUnit / LengthUnit) { return {num, unit}; }

SegmentType = "E" / "M" / "T" / "I" / "R"

Number = [0-9][0-9]* { return parseInt(text(), 10); }

TimeUnit = "\'" / "\""
LengthUnit = "km" / "mi" / "m"