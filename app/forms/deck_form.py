from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileRequired, FileAllowed


class NewDeckForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), Length(min=1, max=50)])
  format = SelectField('format', choices = ['Modern', 'Legacy', 'Commander'])
  cards = FileField('cards', validators=[FileRequired(), FileAllowed('.json')])