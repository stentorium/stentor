/*! Copyright (c) 2019, XAPPmedia */
import { Entity, SlotType } from "stentor-models";

/**
 * Type guard to check if the provided type is an Entity
 * @param type
 */
export function isEntity(type: Entity | SlotType): type is Entity {
    return !!type && (type as Entity).entityId !== undefined;
}

/**
 * Type guard to check if the provided type is the deprecated SlotType
 * @param type
 */
export function isSlotType(type: Entity | SlotType): type is SlotType {
    return !!type && (type as SlotType).name !== undefined;
}
