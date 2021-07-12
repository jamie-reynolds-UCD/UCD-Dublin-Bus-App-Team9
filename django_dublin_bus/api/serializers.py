def serialize_saved_location(location):
    return {'id':location.id, 'full_address':location.full_address, 'location_name':location.location_name}