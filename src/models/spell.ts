import { Document } from 'mongodb';
import { Factory } from './factory';
import { Identifiable } from './identifiable';

export class Spell implements Identifiable, Document {
    public _id: string;
    public Level: number;
    public Name: string;
    public School: string;
    public Ritual: boolean;
    public Type: OneDNDSpellTypes;
    public Changed: boolean;

    constructor(json: any) {
        if (!json._id) {
            throw new Error('Id is required for spells.');
        }
        this._id = json._id;

        this.Level = json.Level;
        this.Name = json.Name;
        this.School = json.School;
        this.Ritual = json.Ritual;
        this.Type = json.Type;
        this.Changed = json.Changed;
    }

    static make(
        level: number,
        name: string,
        school: string,
        type: OneDNDSpellTypes,
        ritual: boolean = false,
        changed: boolean = false,
    ): Spell {
        return new Spell({
            Level: level,
            Name: name,
            School: school,
            Ritual: ritual,
            Type: type,
            Changed: changed,
        });
    }

    static getFactory(): Factory<Spell> {
        return new (class implements Factory<Spell> {
            make(json: any): Spell {
                return new Spell(json);
            }

            getCollectionName(): string {
                return 'spells';
            }

            getUrl(id?: string): string {
                return Spell.getUrl(id);
            }
        })();
    }

    static getUrl(id?: string): string {
        return '/spells' + (id ? `/${id}` : '');
    }
}

export enum OneDNDSpellTypes {
    Arcane,
    Divine,
    Primal,
}
