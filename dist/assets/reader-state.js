// Keep the latest page state usable even when reads work but storage writes fail.
export function createReaderStore(getStorage,onFailure=()=>{}){
 const fallback=new Map();
 return {
  read(key){if(fallback.has(key))return fallback.get(key);try{const value=JSON.parse(getStorage().getItem(key)||'[]');return Array.isArray(value)?value:[];}catch{return [];}},
  write(key,value){try{getStorage().setItem(key,JSON.stringify(value));fallback.delete(key);return true;}catch{fallback.set(key,value);onFailure();return false;}},
  invalidate(key){if(key===null)fallback.clear();else fallback.delete(key);}
 };
}
