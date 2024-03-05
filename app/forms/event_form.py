from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, DateField
from wtforms.validators import DataRequired, Length


class NewEventForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  date = DateField('date', validators=[DataRequired()])
  format = SelectField('format', choices = ['Modern', 'Legacy', 'Commander'])
