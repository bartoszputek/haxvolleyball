export default function areEqual(serializedObject1?: object, serializedObject2?: object):Boolean {
  return JSON.stringify(serializedObject1) === JSON.stringify(serializedObject2);
}
