"""

"""


class Contact:
    def __init__(self, first_name, last_name, mobile_phone, work_phone, email,
                 linkedin, employer, user_id, contact_id=None):
        self.contact_id = contact_id
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.mobile_phone = mobile_phone
        self.work_phone = work_phone
        self.email = email
        self.linkedin = linkedin
        self.employer = employer

